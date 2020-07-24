import { memo } from 'react';
import style from './text.module.css';

import Link from '../link';
import getExcerpt from '../../lib/get-excerpt';

const TextEntry = ({ title, body, href, as }) => {
  const excerpt = getExcerpt(body, 22);
  return (
    <li className={style.card}>
      <h2>{title}</h2>
      <p>{excerpt}...</p>
      <Link className={style.linkCardPost} href={href} as={as} external={!as} title={`${title}`}></Link>
    </li>
  );
};

export default memo(TextEntry);
