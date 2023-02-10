import { Pipe, PipeTransform } from "@angular/core";
import { Task } from "../models/task.model";

@Pipe({name: 'SearchTask'})
export class SerachPipe implements PipeTransform {
    transform(tasks: Task[], search: string) {
        return tasks.filter((task: Task) => task.name.includes(search))
    }
}
