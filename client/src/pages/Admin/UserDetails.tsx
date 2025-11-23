interface UserType {
  id: number;
  username: string;
  email: string;
  address: string;
  role: string;
  rating?: number;
}


interface userProps {
  user: UserType; // React state setter
}

export default function UserDetails({ user }:userProps ) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">User Details</h2>

      <p><strong>Name:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Address:</strong> {user.address}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Id:</strong> {user.id}</p>

      {user.role === "StoreOwner" && (
        <p><strong>Rating:</strong> {user.rating} / 5</p>
      )}
    </div>
  );
}
