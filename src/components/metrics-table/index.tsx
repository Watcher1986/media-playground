import './metrics.css';

export const MetricsTable: React.FC<{ media: Media[] }> = ({ media }) => {
  return (
    <div className='table-wrapper'>
      <table>
        <thead style={{ opacity: 1 }}>
          <tr>
            <td>media</td>
            <td>x-coord</td>
            <td>y-coord</td>
            <td>width</td>
            <td>height</td>
          </tr>
        </thead>
        <tbody>
          {!!media?.length &&
            media.map(({ meta }) => (
              <tr key={meta.title}>
                <td>{meta.title}</td>
                <td>{meta.xCoor}</td>
                <td>{meta.yCoor}</td>
                <td>{meta.width}</td>
                <td>{meta.height}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
