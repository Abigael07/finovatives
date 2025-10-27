// frontend/src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({p}) {
  return (
    <div style={{
      border:'1px solid #eee',
      borderRadius:10,
      overflow:'hidden',
      minWidth:240,
      display:'flex',
      flexDirection:'column',
      background:'#fff'
    }}>
      <Link to={`/product/${p._id}`} style={{textDecoration:'none', color:'inherit'}}>
        <div style={{height:160, background:'#f7f7f7', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <img src={p.image||'/placeholder.png'} alt={p.title} style={{maxWidth:'100%', maxHeight:'100%'}}/>
        </div>

        <div style={{padding:12, flex:1, display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
          <div>
            <h3 style={{margin:'0 0 8px 0', fontSize:16}}>{p.title}</h3>
            <p style={{margin:0, color:'#666', fontSize:13}}>{p.location || 'Unknown'}</p>
          </div>

          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:12}}>
            <strong style={{fontSize:16}}>{p.price ? `KES ${p.price}` : 'Contact seller'}</strong>
            <small style={{color:'#666'}}>{p.unit || ''}</small>
          </div>
        </div>
      </Link>
    </div>
  );
}
