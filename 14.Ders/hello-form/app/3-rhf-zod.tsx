import { View, Text, TextInput, Button } from 'react-native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import RHFInput from '@/src/components/RHFInput';

const loginSchema = z.object({
  email: z.email('Geçerli bir mail adresi giriniz!'),
  password: z.string('Boş bırakmayınız').min(8, 'Şifre en az 8 karakter olmalıdır'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Index = () => {
  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  console.log('RENDERED');

  const onSubmit = (data: { email: string; password: string }) => {
    console.log(data);
  };

  return (
    <View>
      <RHFInput control={control} name="email" />
      <RHFInput control={control} name="password" />
      <Button title="Giriş Yap" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default Index;
