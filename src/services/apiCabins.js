import supabase from './supabase';
import { supabaseUrl } from './supabase';

export async function getCabins() {
  console.log('re-run getCabins');

  let { data: cabin, error } = await supabase.from('cabins').select('*');

  if (error) throw error;

  return cabin;
}

export async function createEditCabin(newCabin, id) {
  // Sample image path
  // https://qesknynvufjftndxrmdz.supabase.co/storage/v1/object/public/cabin-image/cabin-007.jpg

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `https://qesknynvufjftndxrmdz.supabase.co/storage/v1/object/public/cabin-images/${imageName}`;

  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image);

    if (storageError) {
      // console.log(storageError.message);
      throw new Error('Something went wrong while uploading cabin image');
    }
  }

  // Insert cabin
  let cabinQuery = supabase.from('cabins');

  if (!id) cabinQuery = cabinQuery.insert([{ ...newCabin, image: imagePath }]);
  else
    cabinQuery = cabinQuery
      .update({ ...newCabin, image: imagePath })
      .eq('id', id);

  const { data: cabin, error } = await cabinQuery.select().single();

  if (error) throw new Error('Creating cabin failed');

  return cabin;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return true;
}
