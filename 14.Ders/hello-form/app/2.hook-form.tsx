import { View, Text, TextInput, Button } from 'react-native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  email: z.email('Geçerli bir mail adresi giriniz!'),
  password: z.string('Boş bırakmayınız').min(8, 'Şifre en az 8 karakter olmalıdır'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Index = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: { email: string; password: string }) => {
    console.log(data);
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{ required: 'Email adresi girişi zorunludur' }}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Email"
            className="border p-4 text-4xl"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && <Text className="text-2xl text-red-500">{errors.email.message}</Text>}
      <Controller
        control={control}
        rules={{ required: 'Parola girişi zorunludur' }}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Parola"
            secureTextEntry
            className="border p-4 text-4xl"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.password && <Text className="text-2xl text-red-500">{errors.password.message}</Text>}
      <Button title="Giriş Yap" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default Index;
