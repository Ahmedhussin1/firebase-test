import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./components/Auth";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth, db, storage } from "./config/firebase-config";
import { ref, uploadBytes } from "firebase/storage";
function App() {
  // states for fetching the movies from the database
  const [moviesList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const moviesCollection = collection(db, "movies"); //pass the data base and a key, that key should be the same as in the db

  // states to add movie
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieReleaseDate, setNewMovieReleaseDate] = useState(0);
  const [newMovieOscar, setNewMovieOscar] = useState(false);

  // state to update movie
  const [editMovieTitle, setEditMovieTitle] = useState("");

  // state to upload file to firebase storage service
  const [fileUpload, setFileUpload] = useState(null);

  const getMoviesList = async () => {
    try {
      setLoading(true);
      const data = await getDocs(moviesCollection); //get the docs of the referenced collection
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData);
      setMoviesList(filteredData);
    } catch (error) {
      console.error("Error getting movies", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getMoviesList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollection, {
        //add a document in the referenced collection
        title: newMovieTitle,
        releaseDate: newMovieReleaseDate,
        receivedAnOscar: newMovieOscar,
        userId: auth?.currentUser?.uid,
      });
      getMoviesList();
    } catch (error) {
      console.error("Error adding movie", error);
    }
  };

  const deleteMovie = async (movieId) => {
    try {
      const movieDoc = doc(db, "movies", movieId);
      await deleteDoc(movieDoc);
      getMoviesList();
    } catch (error) {
      console.error("error deleting movie " + error);
    }
  };

  const updateMovieTitle = async (movieId) => {
    const movieDoc = doc(db, "movies", movieId);
    await updateDoc(movieDoc, { title: editMovieTitle });
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const fileFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(fileFolderRef, fileUpload); //reference to the storage and file i wanna upload
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  return (
    <div>
      <Auth />
      {/* section to add movie */}
      <div>
        <h1>add movie</h1>
        <input
          value={newMovieTitle}
          type="text"
          placeholder="movie title"
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          value={newMovieReleaseDate}
          type="number"
          placeholder="movie release date"
          onChange={(e) => setNewMovieReleaseDate(Number(e.target.value))}
        />
        <label>received an oscar</label>
        <input
          value={newMovieOscar}
          type="checkbox"
          onChange={(e) => setNewMovieOscar(e.target.checked)}
        />
        <button onClick={onSubmitMovie}>submit movie</button>
      </div>
      <div>
        {loading && (
          <div>
            <h1>Loading ...</h1>
          </div>
        )}
        {moviesList.map((movie, index) => (
          <div key={index}>
            <h1>{movie.title}</h1>
            <h3>{movie.releaseDate}</h3>
            <p>
              {movie.receivedAnOscar ? (
                <p>Won an oscar </p>
              ) : (
                <p>did not won any oscars</p>
              )}
            </p>
            <button onClick={() => deleteMovie(movie.id)}>delete movie</button>
            <input
              type="text"
              onChange={(e) => setEditMovieTitle(e.target.value)}
            />
            <button onClick={() => updateMovieTitle(movie.id)}>
              Edit Movie
            </button>
          </div>
        ))}
      </div>
      <div>
        <label>upload file</label>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>upload file</button>
      </div>
    </div>
  );
}

export default App;
