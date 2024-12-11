import SecurePageWrapper from "../components/securePageWrapper";
import Dashboard from "../dashboard/page";


export default function ProtectedPage() {
    return (
        <SecurePageWrapper>
            <div>
                <h1>Welcome to the Protected Dashboard!</h1>
                <Dashboard />
                {/* Your dashboard content */}
            </div>
        </SecurePageWrapper>
    );
}
