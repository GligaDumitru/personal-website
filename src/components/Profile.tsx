import me from "../assets/me.jpg";

export interface ProfileProps {
  fullName: string;
  title: string;
  profileDescription: string[];
}

const Profile = ({ fullName, title, profileDescription }: ProfileProps) => {
  return (
    <>
      <div className="flex items-center gap-x-3">
        <div className="shrink-0">
          <img
            className="shrink-0 size-16 rounded-full"
            src={me}
            alt="Avatar"
          />
        </div>

        <div className="grow">
          <h1 className="text-lg font-medium text-gray-800 dark:text-neutral-200">
            {fullName}
          </h1>
          <p className="text-sm text-gray-600 dark:text-neutral-400">{title}</p>
        </div>
      </div>
      <div className="mt-8">
        {profileDescription.map((description, index) => (
          <p
            key={index}
            className="mt-3 text-sm text-gray-600 dark:text-neutral-400"
          >
            {description}
          </p>
        ))}
      </div>
    </>
  );
};

export default Profile;
