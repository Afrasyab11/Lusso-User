import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the Quill styles
import "./style.scss";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
    return (
        <div className="custom-editor">
            <ReactQuill theme="snow" value={value} onChange={onChange} />
        </div>
    );
};

export default RichTextEditor;
