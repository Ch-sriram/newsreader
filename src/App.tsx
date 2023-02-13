import * as React from 'react';
import styled from 'styled-components';
import { SimpleGrid, Spinner } from '@chakra-ui/react';
import Card from './components/Card';
import { API } from './constants';

export const AppContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  padding: 20px;
`;

const fetchRecentPosts = async () => {
  try {
    const allData = await fetch(API.url);
    return allData.json();
  } catch (err: any) {
    throw err;
  }
}

const getDateString = (dateString: string) => new Date(dateString).toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric' });

const App = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [sortedData, setSortedData] = React.useState<Array<any>>();

  const fetchRecentPostsAndSortByDate = async () => {
    try {
      const allPosts = await fetchRecentPosts() as Array<Partial<{ date: string }>>;
      return allPosts.sort((a, b) => {
        if ('date' in a && 'date' in b) {
          // @ts-ignore
          return new Date(b.date!) - new Date(a.date!);
        }
        return 0;
      });
    } catch (er: any) {
      console.error(er);
    }
  }

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        setSortedData(await fetchRecentPostsAndSortByDate());
      } catch (err: any) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  console.log(sortedData);

  return (
    <AppContainer>
      <SimpleGrid spacing={10} columns={1} templateColumns='repeat(auto-fill, minmax(400px, 1fr))'>
        {isLoading
          ? <Spinner />
          : (sortedData || []).map((post, idx) => {
            return (
              <Card
                key={idx}
                heading={post.title.rendered}
                link={post.link}
                summary={post.excerpt.rendered}
                dateDetails={getDateString(post.date)}
                author={post.parselyMeta['parsely-author'][0]}
                imageLink={post.parselyMeta['parsely-image-url']}
              />
            );
          })}
      </SimpleGrid>
    </AppContainer>
  );
}

export default App;
