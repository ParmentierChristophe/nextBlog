import { memo } from 'react';

import Link from '../link';

const TextEntry = ({ title, href, as }) => {
  return (
    <li>
      <Link href={href} as={as} external={!as} title={`${title}`}>
        <span>{title}</span>
      </Link>
    </li>
  );
};

export default memo(TextEntry);
