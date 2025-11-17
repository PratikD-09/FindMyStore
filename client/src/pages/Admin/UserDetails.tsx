export default function UserDetails({ user }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">User Details</h2>

      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Address:</strong> {user.address}</p>
      <p><strong>Role:</strong> {user.role}</p>

      {user.role === "StoreOwner" && (
        <p><strong>Rating:</strong> {user.rating} / 5</p>
      )}
    </div>
  );
}
