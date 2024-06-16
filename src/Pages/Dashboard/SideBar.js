export const Sidebar = () => (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active" href="#overview">
              Overview
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#stats">
              Statistics
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#activities">
              Recent Activities
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#settings">
              Settings
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );