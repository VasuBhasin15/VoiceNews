import React, {useState,useEffect} from "react";
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from "./components/NewsCards/NewsCards";
import wordsToNumbers from 'words-to-numbers';
import useStyles from './styles.js';
const alanKey = ''; 
const App = () => {
    const[newsArticles,setNewsArticles]=useState([]);
    const[activeArticle,setActiveArticle]=useState(-1);
    const classes=useStyles();
   useEffect(() => {
    const alanInstance = alanBtn({
        key: alanKey,
        onCommand: ({ command, articles, number }) => {
            if (command === 'newHeadlines') {
                console.log(articles);
                setNewsArticles(articles);
                setActiveArticle(-1);
            } else if (command === 'highlight') {
                setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
            } else if (command === 'open') {
                const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
                const article = articles[parsedNumber - 1];
                if (parsedNumber > 20) {
                    alanInstance.playText('Please try again');
                } else if (article) {
                    window.open(article.url, '_blank');
                    alanInstance.playText('Opening...');
                }
            }
        }
    });
}, []);
    return (
        <div>
          <div className={classes.logoContainer}>
            <img src="logo5.png" className={classes.alanLogo} alt="alan logo"/>
          </div>
           <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    );
}
export default App;




