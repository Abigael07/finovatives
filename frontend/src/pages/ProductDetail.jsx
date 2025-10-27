// frontend/src/pages/ProductDetail.jsx
import React, {useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/api';

export default function ProductDetail() {
  const { id } = useParams();
  const [p, setP] = useState(null);

  useEffect(()=>{
    api.get(`/products/${id}`).then(r=>setP(r));
  },[id]);

  if(!p) return <div style={{padding:20}}>Loading...</div>;

  return (
    <div style={{padding:20, maxWidth:1000, margin:'0 auto'}}>
      <div style={{display:'flex', gap:20}}>
        <div style={{flex:1}}>
          <img src={p.image||'/placeholder.png'} style={{width:'100%', borderRadius:8}} alt={p.title} />
        </div>

        <div style={{width:360}}>
          <h1 style={{marginTop:0}}>{p.title}</h1>
          <p style={{color:'#666'}}>{p.description}</p>
          <p><strong>Price:</strong> {p.price ? `KES ${p.price}` : 'Contact seller'}</p>
          <p><strong>Location:</strong> {p.location}</p>

          <Link to={`/seller/${p.sellerId}`} style={{display:'inline-block', marginTop:12}}>View Seller</Link>

          <div style={{marginTop:18}}>
            <button style={{padding:'10px 14px', borderRadius:8}}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
