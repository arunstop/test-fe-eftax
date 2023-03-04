import Image from "next/image";
import { Roboto } from "next/font/google";
// import styles from './page.module.css'

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
});

export default function Home() {
  return <main className={roboto.className}>this is home!</main>;
}
