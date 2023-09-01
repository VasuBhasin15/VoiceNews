import React,{useState,useEffect,createRef} from 'react';
import {Card,CardActions,CardActionArea,CardContent,CardMedia,Button,Typography} from '@material-ui/core';
import useStyles from './styles.js';
import classNames from 'classnames';
const NewsCard = ({article:{description,publishedAt,name,title,url,urlToImage},i,activeArticle}) => {
  const classes=useStyles();
  const[elRefs,setElRefs]=useState([]);
  const scrollToRef=(ref)=>window.scroll(0,ref.current.offsetTop - 50);
  useEffect(()=>{
    setElRefs((refs)=>Array(20).fill().map((_,j)=>refs[j]||createRef()));
  },[]);
  useEffect(()=>{
    if(i===activeArticle && elRefs[activeArticle]){
      scrollToRef(elRefs[activeArticle]);
    }
  },[i,activeArticle,elRefs])
  return (
    <Card ref={elRefs[i]} className={classNames(classes.card,activeArticle===i ? classes.activeCard:null)}>
      <CardActionArea href={url} target="_blank">
        <CardMedia className={classes.media} image={urlToImage|| 'https://media.istockphoto.com/id/1311148884/vector/abstract-globe-background.jpg?s=612x612&w=0&k=20&c=9rVQfrUGNtR5Q0ygmuQ9jviVUfrnYHUHcfiwaH5-WFE='}/>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
          <Typography variant="body2" color="textSecondary" component="h2">{name}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5">{title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}> 
        <Button size="small" color="primary">Read More</Button>
        <Typography variant="h5" color="textSecondary">{i+1}</Typography>
      </CardActions>
    </Card>
  )
}

export default NewsCard;