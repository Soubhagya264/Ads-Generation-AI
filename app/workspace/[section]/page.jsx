import Profile from "../Profile";
import Dashboard from "../Dashboard";
import Billing from "../Billing";
import MyVideos from "../MyVideos";

export default function DynamicWorkspace({ params }) {
    const section = params?.section;

    console.log("Section:", section); // Debug output
   if (section==="") {
        return <Dashboard />;
    }

    switch (section) {
        case "profile":
            return <Profile />;
        case "dashboard":
            return <Dashboard />;
        case "billing":
            return <Billing />;
        case "my-videos":
            return <MyVideos />;
        default:
            return <div className="p-4 text-red-500">404: Page Not Found</div>;
    }
}
