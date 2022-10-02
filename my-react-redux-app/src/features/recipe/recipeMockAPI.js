// A mock function to mimic making an async request for data
export function fetchRecipeByName(name='') {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: name }), 500)
  );
}
