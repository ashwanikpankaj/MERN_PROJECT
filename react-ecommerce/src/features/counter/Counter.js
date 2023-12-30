import React, { useState } from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import {
  increment,
 
} from './counterSlice';
import styles from './Counter.module.css';

export function Counter() {

  return (
    <div>
      <div className={styles.row}>
      </div>
    </div>
  );
}
