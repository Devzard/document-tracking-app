export default function ListItem({ icon, name, isActive, desc }) {
  return (
    <div
      className={`${isActive ? "bg-muted text-primary" : "bg-background text-primary"} flex items-center space-x-2 rounded-md p-2 text-sm hover:bg-muted-foreground hover:text-accent`}
    >
      {icon}
      <p>{name}</p>
      {desc ? <p className="text-muted">{desc}</p> : ""}
    </div>
  );
}
