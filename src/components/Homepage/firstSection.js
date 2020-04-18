import React from 'react';
import run from './run.jpg';
import climb from './climb.jpg';
import './style.css';

function FirstSection(){
    return(
      <div className='section'>
        <div className='mainbox'>
          <img src={run} className='run float-left' alt='yes' />
            <div className='frontBox'>
            <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, deserunt vel deleniti distinctio ipsa dicta, cupiditate rerum nostrum magni sapiente tenetur repellat possimus laboriosam ipsam illum repudiandae at, quis ea.

            </p>
            <button type="button" class="btn btn-primary">Login</button> 
            </div>
          <img src={climb} className='climb float-right' alt='yes' />
        </div>
      </div>
    );
}

export default FirstSection;