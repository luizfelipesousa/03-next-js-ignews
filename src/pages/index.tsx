import Head from "next/head";
import { GetStaticProps } from "next";

import { SubscribeButton } from "../components/SubscribeButton";

import styles from "../styles/home.module.scss";
import { stripe } from "../services/stripe";

interface HomeProps {
  product: {
    productId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  console.log(product);
  console.log(">>");

  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about <br />
            the <span>React</span> world
          </h1>
          <p>
            Get acess to all the publications
            <br />
            <span>for {product.amount} daily</span>
          </p>
          <SubscribeButton priceId={product.productId} />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1K8sYJAQRhFgqmV7Kox3espm", {
    expand: ["product"],
  });

  const product = {
    productId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };

  return {
    props: { product },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
