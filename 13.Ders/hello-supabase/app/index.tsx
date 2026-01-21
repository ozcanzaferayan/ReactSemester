// rnfe

import { View, Text, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import {
  useAddTodoWithErrors,
  useDeleteTodoWithErrors,
  useTodosWithErrors,
} from '@/src/hooks/useTodos';

const Index = () => {
  const { data: todos } = useTodosWithErrors();
  const [title, setTitle] = useState('');
  const { mutate: addTodo, error: addTodoError } = useAddTodoWithErrors();
  const { mutate: deleteTodo, error: deleteTodoError } = useDeleteTodoWithErrors();

  return (
    <View>
      <TextInput value={title} onChangeText={setTitle} className="border p-4" />
      <Button title="Ekle" onPress={() => addTodo(title)} />
      {addTodoError && (
        <Text className="text-red-500">Bir hata oluştu: {addTodoError.message}</Text>
      )}
      {deleteTodoError && (
        <Text className="text-red-500">Bir hata oluştu: {deleteTodoError.message}</Text>
      )}
      <FlatList
        data={todos}
        keyExtractor={(todo) => todo.id.toString()}
        renderItem={({ item: todo }) => {
          const textClass = todo.isCompleted ? 'line-through' : '';
          return (
            <View className="flex-row gap-4">
              <Text className={'text-6xl' + ' ' + textClass}>{todo.title}</Text>
              <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
                <Text className={'text-6xl'}>🚮</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Index;
