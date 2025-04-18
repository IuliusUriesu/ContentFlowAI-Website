import { useParams } from "react-router";

export default function GeneratedContentPage() {
  const { id } = useParams();

  return <div>Generated Content {id}</div>;
}
