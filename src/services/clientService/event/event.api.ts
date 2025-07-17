import { Event } from '@prisma/client';
import { apiClient } from '..';
import { useMutation, useQuery } from '@tanstack/react-query';
import { eventQueryKeys } from './event.qkey';
import { SuccessResponse } from '../interface';
import { queryClient } from '../query-client';
import { CreateEventInput } from '~/services/serverService/event/event.service';

export const invalidateEventQuery = () => {
  queryClient.invalidateQueries({
    predicate: (query) => Array.isArray(query.queryKey) && query.queryKey[0] === eventQueryKeys.all[0],
  });
};

export const getEvent = async (id: string) => {
  const event = await apiClient.get<SuccessResponse<Event>>(`/event/${id}`);
  return event;
};

export const getEvents = async (page: number, limit: number) => {
  const events = await apiClient.get<SuccessResponse<Event[]>>(`/event?page=${page}&limit=${limit}`);
  return events;
};

export const createEvent = async (event: CreateEventInput) => {
  const newEvent = await apiClient.post<SuccessResponse<Event>>('/event', event);
  return newEvent;
};

export const updateEvent = async (id: string, event: CreateEventInput) => {
  const updatedEvent = await apiClient.put<SuccessResponse<Event>>(`/event/${id}`, event);
  return updatedEvent;
};

export const deleteEvent = async (id: string) => {
  const deletedEvent = await apiClient.delete<SuccessResponse<Event>>(`/event/${id}`);
  return deletedEvent;
};

export const useGetEvent = (id: string) => {
  return useQuery({
    queryKey: eventQueryKeys.detail(id),
    queryFn: () => getEvent(id),
  });
};

export const useGetEvents = (page: number, limit: number) => {
  return useQuery({
    queryKey: eventQueryKeys.list(page, limit),
    queryFn: () => getEvents(page, limit),
  });
};

export const useCreateEvent = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      onSuccess();
      invalidateEventQuery();
    },
  });
};

export const useUpdateEvent = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: ({ event, id }: { event: CreateEventInput; id: string }) => updateEvent(id, event),
    onSuccess: () => {
      onSuccess();
      invalidateEventQuery();
    },
  });
};

export const useDeleteEvent = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: (id: string) => deleteEvent(id),
    onSuccess: () => {
      onSuccess();
      invalidateEventQuery();
    },
  });
};
