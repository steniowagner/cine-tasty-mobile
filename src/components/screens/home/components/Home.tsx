import React from 'react';
import { ScrollView } from 'react-native';

import metrics from 'styles/metrics';

import MediaSwitcher from './media-switcher/MediaSwitcher';
import Header from './header/Header';
import Section from './Section';

const movies = [
  {
    voteAverage: 7,
    voteCount: 11,
    image: '/kiX7UYfOpYrMFSAGbI6j1pFkLzQ.jpg',
    title: 'After We Collided',
    id: 337401,
  },
  {
    voteAverage: 7.6,
    voteCount: 11,
    image: '/72I82eKXCadZWEYygV9GkJOQNEq.jpg',
    title: 'Mulan',
    id: 337401,
  },
  {
    voteAverage: 7.2,
    voteCount: 11,
    image: '/uobkkvvKCZbTKpJCMnvuTRQt5bV.jpg',
    title: 'Ava',
    id: 337401,
  },
  {
    voteAverage: 6.2,
    voteCount: 11,
    image: '/eDnHgozW8vfOaLHzfpHluf1GZCW.jpg',
    title: 'Archive',
    id: 337401,
  },
  {
    voteAverage: 8.6,
    voteCount: 122,
    image: '/aVbqhqYtlxwEGihTEhewZAgDOCX.jpg',
    title: 'Mortal',
    id: 33741,
  },
];

const Home = () => (
  <>
    <ScrollView
      contentContainerStyle={{
        paddingTop: metrics.getWidthFromDP('24%'),
      }}
    >
      <Header />
      <Section
        onPressViewAll={() => console.warn('onPressViewAll')}
        onPressItem={(id: number) => console.warn(id)}
        sectionTitle="Trending now"
        items={movies}
      />
      <Section
        onPressViewAll={() => console.warn('onPressViewAll')}
        onPressItem={(id: number) => console.warn(id)}
        sectionTitle="Popular"
        items={[movies[2], movies[1], movies[0], movies[4], movies[3]]}
      />
      <Section
        onPressViewAll={() => console.warn('onPressViewAll')}
        onPressItem={(id: number) => console.warn(id)}
        sectionTitle="Top Rated"
        items={[movies[2], movies[1], movies[0], movies[4], movies[3]].reverse()}
      />
      <Section
        onPressViewAll={() => console.warn('onPressViewAll')}
        onPressItem={(id: number) => console.warn(id)}
        sectionTitle="Upcoming"
        items={[movies[0], movies[3], movies[2], movies[4], movies[1]].sort()}
      />
    </ScrollView>
    <MediaSwitcher />
  </>
);

export default Home;
