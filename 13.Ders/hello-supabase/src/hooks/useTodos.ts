import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export type Todo = {
  id: number;
  created_at: Date;
  title: string;
  isCompleted: boolean;
};
// Hata göz ardı edilir

export function useTodos() {
  return useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: async () =>
      supabase
        .from('todos')
        .select()
        .then((res) => (res.data ?? []) as Todo[]),
  });
}

// Hata yakalanır
export function useTodosWithErrors() {
  return useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data, error } = await supabase.from('todos').select();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
}

// Hata göz ardı edilir
export function useAddTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (title: string) =>
      supabase.from('todos').insert({
        title,
        isCompleted: false,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}
// Hata yakalanır
export function useAddTodoWithErrors() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (title: string) => {
      const { data, error } = await supabase.from('todos').insert({
        title,
        isCompleted: false,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}

// Hata yakalanır
export function useDeleteTodoWithErrors() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data, error } = await supabase.from('todos').delete().eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}
