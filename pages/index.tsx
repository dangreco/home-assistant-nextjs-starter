import React, { useState } from 'react';

import { useAuth, useEntities, useHass, useQuery } from '@hooks';
import { Page } from '@components/structure';


const Home: React.FunctionComponent = () => {;

  const { logout } = useAuth();
  const { connection } = useHass();
  const entities = useEntities();

  const [query, setQuery] = useState<string | undefined>();
  const results = useQuery(query || '');

  const t = results['foo'];

  return (
    <Page>
      <button
        onClick={() => logout(connection)}
      >
        Log Out
      </button>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <p>
        Total # of Entities:
        { ' ' }
        { Object.keys(entities).length }
      </p>

      <p>
        # of Found Entities:
        { ' ' }
        { Object.keys(results).length }
      </p>

      <pre>
        { JSON.stringify(results, null, 2) }
      </pre>
    </Page>
  )
}

export default Home;
