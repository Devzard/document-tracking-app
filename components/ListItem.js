export default function ListItem({ icon, name, isActive }) {
  return (
    <div
      className={`${isActive ? "bg-muted text-primary" : "text-primary bg-background"} hover:bg-muted-foreground hover:text-accent flex items-center space-x-2 rounded-md p-2 text-sm`}
    >
      {icon}
      <p>{name}</p>
    </div>
  );
}
