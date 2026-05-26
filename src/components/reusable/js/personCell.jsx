import '../css/crmReusable.css';

const avatarToneMap = {
  blue: 'crmAvatarBlue',
  sky: 'crmAvatarSky',
  green: 'crmAvatarGreen',
  orange: 'crmAvatarOrange',
  violet: 'crmAvatarViolet',
};

const PersonCell = ({ initials, name, subtext, tone = 'blue' }) => {
  const toneClass = avatarToneMap[tone] || avatarToneMap.blue;

  return (
    <div className="crmPersonCell">
      <span className={`crmAvatar ${toneClass}`}>{initials}</span>
      <div>
        <span className="crmPersonName">{name}</span>
        {subtext && <span className="crmPersonSub">{subtext}</span>}
      </div>
    </div>
  );
};

export default PersonCell;
