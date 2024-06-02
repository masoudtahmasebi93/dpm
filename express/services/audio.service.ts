export const audioProcess = (audioFile: Express.Multer.File): Promise<string> => {
    // do the process here
    console.log('doing some process');
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                resolve(audioFile.destination + '/' + audioFile.filename);
            }, 300);
        } catch (error) {
            reject('no audio file was passed');
        }

    });
}
