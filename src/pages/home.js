import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from './home.module.css';
import Header from "../app/components/Header";
import "../app/globals.css";

const Home = () => {
  const [catImage, setCatImage] = useState(null);
  const [height, setHeight] = useState(0);

  const fetchNewCatImage = async () => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      const data = await response.json();
      if (data && data.length > 0) {
        setCatImage(data[0].url);
        setHeight(data[0].height);
      }
    } catch (error) {
      console.error('Error fetching cat image:', error);
    }
  };

  useEffect(() => {
    fetchNewCatImage();
  }, []);

  const getColorForHeight = (height) => {
    if (height < 300) {
      return 'rgba(173, 216, 230, 0.5)'; 
    } else if (height >= 300 && height < 500) {
      return 'rgba(144, 238, 144, 0.5)'; 
    } else {
      return 'rgba(255, 182, 193, 0.5)'; 
    }
  };

  return (
    <div style={{ backgroundColor: getColorForHeight(height) }}>
      <Head>
        <title>Cats' Intelligence</title>
        <meta name="description" content="Information about cats' intelligence" />
      </Head>
      <Header/> 
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            {catImage && <img src={catImage} alt="Cat" className={styles.catImage} />}
            
            <button className={styles.button} onClick={fetchNewCatImage}>
                New Cat Image
              </button>
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>Cats' Intelligence</h1>
            <p className={styles.paragraph}>
            The cat’s intellectual ability is highlighted by its ability to use the information retained to solve problems. Cats are able to form “learning sets,” a skill once thought to be confined to primates. For example, cats that were trained to pull boxes on wheels showed they could combine that skill with their own insight to solve new problems. In one instance, a cat pulled the box to a specific location and used it, step-stool fashion, to reach a desired reward: a piece of food suspended from the ceiling by a string. The full extent of the cat’s cognitive abilities is still largely unknown, but they continue to amaze their owners with their ingenious abilities, nevertheless.

Cats learn by observation, imitation, trial and error just as humans do. Stories abound which describe cats turning doorknobs to open doors, ringing doorbells, opening cupboards, turning off lights, and even using the toilet solely by observing the owner performing these activities. Many feline behaviorists as well as child psychologists seem to agree that the intelligence of an adult cat equals that of a 2 to 3 year old child. We know how clever and manipulative children of this age are, is it any wonder that cats are better at training their owners than the owners are at training them?
            </p>
            <div className={styles.buttons}>
            
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;



