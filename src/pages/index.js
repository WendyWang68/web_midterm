import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from "../app/components/Header";
import "../app/globals.css";


export const RetrievalCatFact = (catFacts) => {
  let facts = []
  catFacts.map((fact, _) => {
    facts.push(fact)
  })
  let randomFact = catFacts[(Math.floor(Math.random() * catFacts.length))]

  return randomFact
}

const renderDialog = (name)  => {
  alert(name)
};

export default function Home({ picData }) {
  const [catFacts, setCatFacts] = useState([]);

  useEffect(() => {
    async function fetchCatFacts() {
      try {
        const response = await fetch('https://meowfacts.herokuapp.com/?count=1000');
        const data = await response.json();
        setCatFacts(data.data); 
      } catch (error) {
        console.error('Error fetching cat facts:', error);
      }
    }

    fetchCatFacts();
  }, []);

  return (
    <div style={{ backgroundColor: 'rgb(229, 204, 255)' }}>
      <Head>
        <title>Fun Cat Facts</title>
        <meta name="description" content="Interesting and Fun Cat Facts" />
      </Head>
      <Header/> 
      <main>
        <h1>Fun Cat Facts</h1>
        <div className='image-section'>
          <div className='cat-images'>
            {picData && picData.map((pic, index) => (
              <div key={index} className='cats'>
                <img key={index} src={pic.url} alt={`Cat Image ${index + 1}`} />
                <button className="button" onClick={() => {renderDialog(RetrievalCatFact(catFacts))}}> Show Random Cat Fact</button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const CAT_FACTS_API = 'https://meowfacts.herokuapp.com/?count=3';
    const CAT_PIC = 'https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=REPLACE_ME';

    const responseCatFactsAPI = await fetch(CAT_FACTS_API);
    const catFactsData = await responseCatFactsAPI.json();

    const responsePicAPI = await fetch(CAT_PIC);
    const picData = await responsePicAPI.json();

    return {
      props: {
        catFactsData,
        picData,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        catFactsData: null,
        picData: null,
      },
    };
  }
}


