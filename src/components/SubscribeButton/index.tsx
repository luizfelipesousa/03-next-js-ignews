import styles from "./styles.module.scss";

interface subscribeProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: subscribeProps) {
  return (
    <button className={styles.subscribe} type="button">
      Subscribe now
    </button>
  );
}
