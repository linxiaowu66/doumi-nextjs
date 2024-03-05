import * as React from "react";
import dayjs from "dayjs";
import {
  Select,
  TextField,
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  Drawer,
  SelectChangeEvent,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import styles from "./index.module.css";

interface ConfigProps {
  digest: string;
  illustration: string;
  tags: string[];
  archiveTime: string;
  category: string;
}

interface BlogConfigProps {
  isOpen: boolean;
  closeCb: (data: ConfigProps) => void;
  tags: string[];
  cats: string[];
  initData?: {
    tags: string[];
    cat: string;
    archiveTime: string;
    illustration: string;
    digest: string;
  };
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function BlogConfig(props: BlogConfigProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [illustration, setIllustration] = React.useState<string>("");
  const [digest, setDigest] = React.useState<string>("");

  const [selectTags, setTags] = React.useState<string[]>([]);
  const [selectCat, setCategory] = React.useState<string>("");

  React.useEffect(() => {
    if (props.initData?.archiveTime !== undefined) {
      setSelectedDate(
        props.initData?.archiveTime === ""
          ? new Date()
          : new Date(props.initData?.archiveTime)
      );
    }
    if (props.initData?.illustration !== undefined) {
      setIllustration(props.initData?.illustration);
    }
    if (props.initData?.digest !== undefined) {
      setDigest(props.initData?.digest);
    }
    if (props.initData?.tags !== undefined) {
      setTags(props.initData?.tags);
    }
    if (props.initData?.cat !== undefined) {
      setCategory(props.initData?.cat);
    }
  }, [props]);

  const handleDateChange = (date: Date | null) => {
    if (date !== null) setSelectedDate(date);
  };

  const handleTagsChange = (event: SelectChangeEvent) => {
    setTags(event.target.value.split(","));
  };
  const handleCatChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  return (
    <div>
      <Drawer
        anchor="right"
        open={props.isOpen}
        onClose={() =>
          props.closeCb({
            archiveTime: dayjs(selectedDate).format("YYYY-MM-DD"),
            illustration,
            tags: selectTags,
            category: selectCat,
            digest,
          })
        }
      >
        <div className={styles.root}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="YYYY-MM-DD"
              label="归档时间"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
          <TextField
            className={styles.formControl}
            id="outlined-basic"
            label="首页图片"
            variant="outlined"
            value={illustration}
            fullWidth
            onChange={(e) => setIllustration(e.target.value)}
          />
          <TextField
            className={styles.formControl}
            multiline
            id="outlined-basic"
            label="文章摘要"
            variant="outlined"
            rows={10}
            value={digest}
            fullWidth
            onChange={(e) => setDigest(e.target.value)}
          />
          <FormControl className={styles.formControl} fullWidth>
            <InputLabel id="demo-mutiple-name-label">文章标签</InputLabel>
            <Select
              labelId="demo-mutiple-name-label"
              id="demo-mutiple-name"
              multiple
              value={selectTags.join(",")}
              onChange={handleTagsChange}
              input={<Input />}
              MenuProps={MenuProps}
            >
              {props.tags.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  //   style={getStyles(name, props.tags, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={styles.formControl} fullWidth>
            <InputLabel id="demo-mutiple-name-label">文章分类</InputLabel>
            <Select
              labelId="demo-mutiple-name-label"
              id="demo-mutiple-name"
              value={selectCat}
              onChange={handleCatChange}
              input={<Input />}
              MenuProps={MenuProps}
            >
              {props.cats.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  // style={getStyles(name, props.cats, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Drawer>
    </div>
  );
}
