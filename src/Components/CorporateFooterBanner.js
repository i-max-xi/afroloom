import React from 'react';

const iconClass = 'bi more-info-icon shrink-0 text-white';

const CorporateFooterBanner = ({ bgColor = 'orange', Color = 'white' }) => {
  const renderListItem = (icon, title, description = '') => (
    <li className="flex flex-col gap-1 lg:flex-row justify-center items-center border-r border-white/30 last:border-r-0 even:border-none lg:even:border-r lg:my-10 px-4">
      <div className="flex shrink-0 items-center justify-center">{icon}</div>
      <div className="flex flex-col justify-content-center gap-1 leading-tight">
        <p className="mb-0 font-medium text-sm text-center text-white">{title}</p>
        {description ? (
          <p className="mb-0 text-xs text-center text-white/90">{description}</p>
        ) : null}
      </div>
    </li>
  );

  return (
    <div
      className="rounded-top text-white"
      style={{ backgroundColor: bgColor, color: Color }}
    >
      <ul className="container grid grid-cols-2 lg:grid-cols-4 p-2 lg:p-5 gap-2 lg:gap-5 list-unstyled justify-content-around mb-0">
        {renderListItem(
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className={`${iconClass} bi-grid`}
            viewBox="0 0 16 16"
            width="32"
            height="32"
            aria-hidden="true"
          >
            <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z" />
          </svg>,
          'A growing product suite',
          'Afroloom builds everyday products for fashion, services, and more.'
        )}

        {renderListItem(
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className={`${iconClass} bi-check2-circle`}
            viewBox="0 0 16 16"
            width="32"
            height="32"
            aria-hidden="true"
          >
            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
          </svg>,
          'Quality & trust',
          'Every Afroloom product is held to clear standards you can rely on.'
        )}

        {renderListItem(
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className={`${iconClass} bi-shield-check`}
            viewBox="0 0 16 16"
            width="32"
            height="32"
            aria-hidden="true"
          >
            <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157 1.676 7.48 4.74 9.814a.48.48 0 0 0 .408 0c3.064-2.334 4.294-5.657 4.74-9.814a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a1.5 1.5 0 0 1-1.058.585 12 12 0 0 1-6.098 0 1.5 1.5 0 0 1-1.058-.585c-1.678-2.195-3.061-5.513-2.465-9.99a1.54 1.54 0 0 1 1.044-1.263z" />
            <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0" />
          </svg>,
          'Secure & transparent',
          'Clear policies, safe payments, and honest experiences across our platforms.'
        )}

        {renderListItem(
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className={`${iconClass} bi-envelope`}
            viewBox="0 0 16 16"
            width="32"
            height="32"
            aria-hidden="true"
          >
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
          </svg>,
          'Get in touch',
          'Questions about Afroloom or any of our products? Contact us.'
        )}
      </ul>
    </div>
  );
};

export default CorporateFooterBanner;
