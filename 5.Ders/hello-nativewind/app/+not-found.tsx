import { Link, Stack } from 'expo-router';

import { Text, View } from 'react-native';

import { Container } from '@/components/Container';

export default function NotFoundScreen() {
  return (
    <View className={styles.container}>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Container>
        <Text className={styles.title}>{"This screen doesn't exist."}</Text>
        <Link href="/" className={styles.link}>
          <Text className={styles.linkText}>Go to home screen!</Text>
        </Link>
      </Container>
    </View>
  );
}

const styles = {
  container: `flex flex-1 bg-white`,
  title: `text-xl font-bold`,
  link: `mt-4 pt-4`,
  linkText: `text-base text-[#2e78b7]`,
};
