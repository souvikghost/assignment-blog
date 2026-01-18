import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import BlogForm from "./BlogForm";

interface BlogFormProps {
  setIsCreateNewBlog: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateBlogSection = ({setIsCreateNewBlog}:BlogFormProps) => {
  return (
    <Card  className="w-full border p-6! border-white/10 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-sans font-semibold text-white">
          Create New Blog
        </CardTitle>
      </CardHeader>

      <CardContent className="">
        <BlogForm setIsCreateNewBlog={setIsCreateNewBlog}/>
      </CardContent>
    </Card>
  );
};

export default CreateBlogSection;
