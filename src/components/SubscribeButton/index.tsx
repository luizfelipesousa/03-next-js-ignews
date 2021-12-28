import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import getStripeJs from "../../services/stripe.js";
import styles from "./styles.module.scss";

interface subscribeProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: subscribeProps) {
  const { data: session } = useSession();
  const router = useRouter();

  async function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }

    if (session?.activeSubscription) {
      router.push("/posts");
      return;
    }

    // criar checkout session
    // por questoes de seguranca sera criada na pasta de api para nao deixar
    // a chave privada do stripe publica no front end
    try {
      const response = await api.post("subscribe");
      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <button
      onClick={() => handleSubscribe()}
      className={styles.subscribe}
      type="button"
    >
      Subscribe now
    </button>
  );
}
