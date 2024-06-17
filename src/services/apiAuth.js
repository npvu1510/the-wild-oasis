import supabase from './supabase';

import { supabaseUrl } from './supabase';

export async function login(email, password) {
  console.log('loginAPI');
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  console.log(`FROM LOGINAPI: `, data?.user);

  return data?.user;
}

export async function getCurrentUser() {
  console.log('getCurrentUser');
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw error;
  }

  console.log('FROM getCurrentUser', data?.user);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function signup(email, password, options) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { ...options } },
  });

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function updateUser(fullName, avatar, password) {
  let updateData = password ? { password } : { data: { fullName } };
  let imageName, imagePath;

  if (avatar) {
    imageName = `avatar-${Math.random()}.jpg`.replaceAll('/', '');
    imagePath = `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`;

    const { error: storageError } = await supabase.storage
      .from('avatars')
      .upload(imageName, avatar);

    if (storageError) {
      console.log(storageError.error);
      throw storageError;
    }

    updateData = { data: { fullName, avatar: imagePath } };
  }

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    console.log(error);
    throw error;
  }

  return data;
}
