const UserForm = ({
    formHandler,
    userData,
    setName,
    setRole,
    setUsername,
    setPassword,
    setIdentity,
}) => {
    return (
        <form
            onSubmit={formHandler}
            className="w-full h-auto lg:grid lg:grid-cols-2 lg:gap-4"
        >
            <div className="mb-4 lg:mb-0">
                <input
                    type="text"
                    value={userData.name.value}
                    className="forminput"
                    onChange={(i) => setName(i.target.value)}
                    placeholder="Masukkan Nama Lengkap.."
                />
            </div>
            <div className="mb-4 lg:mb-0">
                <select
                    value={userData.role.value}
                    className="forminput"
                    onChange={(i) => setRole(i.target.value)}
                >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                </select>
            </div>
            <div className="mb-4 lg:mb-0">
                <input
                    type="text"
                    value={userData.username.value}
                    className="forminput"
                    onChange={(i) => setUsername(i.target.value)}
                    placeholder="Masukkan Nama Pengguna.."
                />
            </div>
            <div className="mb-4 lg:mb-0">
                <input
                    type="password"
                    value={userData.password.value}
                    className="forminput"
                    onChange={(i) => setPassword(i.target.value)}
                    placeholder="Masukkan Password.."
                />
            </div>
            <div className="mb-4 lg:mb-0 lg:col-span-2">
                <textarea
                    rows="4"
                    value={userData.identity.value}
                    className="forminput"
                    onChange={(i) => setIdentity(i.target.value)}
                    placeholder="Masukkan Identitas.."
                />
            </div>
            <div>
                <button
                    type="submit"
                    className="button normal-case lg:w-auto lg:px-8"
                >
                    Simpan
                </button>
            </div>
        </form>
    );
};

export default UserForm;
