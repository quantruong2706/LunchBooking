import UserCard from './UserCard'

const Members = () => {
  return (
    <div className="flex flex-col items-center pt-6 pb-12 bg-gradient-to-b from-light-green-2 to-light-green-3">
      <h1 className="font-bellota text-center text-3xl pb-4">Thành viên</h1>
      <input type="text" className="rounded-full max-w-xs px-6 py-2.5 min-w-[300px] md:min-w-[600px]" placeholder="Search" />
      <div className="pt-6 flex flex-col gap-4">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </div>
  )
}

export default Members
