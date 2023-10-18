import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/context';
import  {Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const {followers,repos}=useGlobalContext()
  let languages=repos.reduce((total,item)=>{
    const {language,stargazers_count}=item
    if(!language){
      return total;
    }
    if(!total[language])
      total[language]={label:language,value:1,stars:stargazers_count}

    total[language]={...total[language],value:total[language].value+1
    ,stars:total[language].stars+stargazers_count
  };
    return total;
  },{})


  const mostUsed=Object.values(languages).sort((a,b)=>b.value-a.value).slice(0,5)
  const mostStarred=Object.values(languages).sort((a,b)=>b.stars-a.stars).slice(0,5).map(i=>{
    return {...i,value:i.stars}
  })


  let {stars,forks}=repos.reduce((total,item)=>{
    const {stargazers_count,name,forks}=item;
    total.stars[stargazers_count]={label:name,value:stargazers_count}
    total.forks[forks]={label:name,value:forks}
    return total
  },{stars:{},forks:{}})

  stars=Object.values(stars).sort((a,b)=>b.value-a.value).slice(0,5)
  forks=Object.values(forks).sort((a,b)=>b.value-a.value).slice(0,5)
    
  return <section className="section">
  <Wrapper className='section-center'>
    <Pie3D data={mostUsed}/>
    <Column3D data={stars}/>
    <Doughnut2D data={mostStarred}/>
    <Bar3D data={forks}/>
  </Wrapper>;
  </section>
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  } 
`;

export default Repos;
