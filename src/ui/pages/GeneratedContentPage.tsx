import { useParams } from "react-router";
import { config } from "../../config/config";

export default function GeneratedContentPage() {
  const { id } = useParams();

  return (
    <>
      <title>{config.appTitle}</title>
      <div>Generated Content {id}</div>
    </>
  );
}
