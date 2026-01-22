import { View, Text, TextInput, TextInputProps } from 'react-native';
import React from 'react';
import { Controller } from 'react-hook-form';

type Props = TextInputProps & {
  control: any;
  name: string;
};

const RHFInput = ({ ...props }: Props) => {
  const { name, control } = props;
  return (
    <View>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <View>
            <TextInput
              {...props}
              className="border p-4 text-4xl"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            {fieldState.error && (
              <Text className="text-2xl text-red-500">{fieldState.error.message}</Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default RHFInput;
