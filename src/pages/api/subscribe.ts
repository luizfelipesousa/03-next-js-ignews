import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { fauna } from "../../services/fauna";
import { query as q } from "faunadb";
import { stripe } from "../../services/stripe";

type User = {
  ref: {
    id: string;
  };
  ts: number;
  data: {
    customerId: string;
    email: string;
  };
};

export default async function Subscribe(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getSession({ req });

    const user = await fauna.query<User>(
      q.Get(q.Match(q.Index("user_by_email"), q.Casefold(session.user.email)))
    );

    let userCustomerId = user.data.customerId;
    if (!user.data.customerId) {
      const stripeCustomer = await stripe.customers.create({
        email: session.user.email,
      });

      const updatedUser = await fauna.query<User>(
        q.Update(q.Ref(q.Collection("users"), user.ref.id), {
          data: {
            customerId: stripeCustomer.id,
          },
        })
      );

      userCustomerId = updatedUser.data.customerId;
    }

    // Create Checkout Sessions from body params.
    const stripeSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: process.env.STRIPE_PRICE_ID,
        },
      ],
      customer: userCustomerId,
      mode: "subscription",
      success_url: process.env.STRIPE_SUCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
      billing_address_collection: "required",
      payment_method_types: ["card"],
      allow_promotion_codes: true,
    });
    // res.redirect(303, stripeSession.url);
    res.status(200).json({ sessionId: stripeSession.id });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not Allowed");
  }
}
