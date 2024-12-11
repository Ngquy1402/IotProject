    export interface Exam {
    id: string;
    name: string;
    description: string;
}
 
export interface Answer {
    id: string;
    bai_thi_id: string;
    stt: number;
    dap_an: string;
    created_at: string;
}

export interface Student {
    id: string;
    bai_thi_id: string;
    mssv: string;
    lop: string;
    answer: {
        [key: string]: any; 
    };
    image: string;
    name: string;
    point: number;
    created_at: string;
}


export interface ExamDetailData {
    id: string;
    name: string;
    description?: string;
    dapan: Answer[];
    sinhvien: Student[];
    created_at: string;
}
