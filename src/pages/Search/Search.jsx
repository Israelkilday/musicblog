// CSS
import styles from "./Search.module.css"
// HOOKS 
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
// COMPONENTS
import PostDetail from "../../components/PostDetail";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts } = useFetchDocuments("posts")

  return (
    <div>
      <h2>Search</h2>
      <div>
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)};
      </div>
    </div>
  );
};

export default Search;