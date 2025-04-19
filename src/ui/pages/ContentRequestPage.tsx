import { useParams } from "react-router";

export default function ContentRequestPage() {
  const { id } = useParams();

  return <div>Content Request {id}</div>;
}
