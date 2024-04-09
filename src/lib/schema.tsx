
import { z } from 'zod';


// Users
export const userSchema = z.object({
  username: z.string()
    .min(4, { message: 'Please enter a username with at least 4 characters.' })
    .regex(/^[a-zA-Z0-9]*$/, { message: 'The username should only contain letters and numbers.' }),
  jobTitle: z.string()
    .min(4, { message: 'Please provide a job title with at least 4 characters.' })
    .regex(/^[a-zA-Z0-9]*$/, { message: 'The job title should only contain letters and numbers.' }),
});


export type UserData = z.infer<typeof userSchema>;

// GraphQL data
export const animeMediaSchema = z.object({
  id: z.number(),
  title: z.object({
    romaji: z.string(),
  }),
  description: z.string(),
  coverImage: z.object({
    large: z.string(),
  }),
});

export const pageInfoSchema = z.object({
  currentPage: z.number(),
  lastPage: z.number(),
});

export const pageDataSchema = z.object({
  media: z.array(animeMediaSchema),
  pageInfo: pageInfoSchema,
});

export const queryDataSchema = z.object({
  Page: pageDataSchema,
});

export type AnimeMedia = z.infer<typeof animeMediaSchema>;
export type PageInfo = z.infer<typeof pageInfoSchema>;
export type PageData = z.infer<typeof pageDataSchema>;
export type QueryData = z.infer<typeof queryDataSchema>;


// Generic modal content
export const modalContentSchema = z.object({
  title: z.string(),
  imageURL: z.string(),
  content: z.string(),
});

export type ModalContent = z.infer<typeof modalContentSchema>;